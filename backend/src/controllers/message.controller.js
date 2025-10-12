// Importing the Message model (used to fetch chat messages)
import Message from "../models/message.js";

// Importing the User model (used to fetch user/contact details)
import User from "../models/user.model.js";

// ---------------------- Get All Contacts Controller ----------------------
export const getAllContacts = async (req, res) => {
  try {
    // Getting the logged-in user's ID from the request (added by protectRoute middleware)
    const loggedInUserId = req.user._id;

    // Finding all users except the currently logged-in user
    // "$ne" means "not equal" → so it excludes your own account
    // "select('-password')" removes the password field from the result for security
    const fillteredContacts = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    // Sending the filtered users list as JSON response with status 200 (OK)
    res.status(200).json(fillteredContacts);
  } catch (error) {
    // If any error occurs, log it and send a server error response
    console.error("Error in getAllContacts:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ---------------------- Get Messages Between Two Users ----------------------
export const getMessagesByUserId = async (req, res) => {
  try {
    // Get the logged-in user's ID
    const myId = req.user._id;

    // Extract the other user's ID (the person you are chatting with) from the URL parameter
    // Example: if URL is /messages/123 → then userToChatId = 123
    const { id: userToChatId } = req.params;

    // Find all messages where:
    // 1️⃣ You sent a message to the other user, OR
    // 2️⃣ The other user sent a message to you
    // "$or" helps to match both conditions
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    // Send all found messages as JSON response with status 200 (OK)
    res.status(200).json(messages);
  } catch (error) {
    // If any error occurs, log it and send a server error response
    console.error("Error in getMessage controller:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if(!text && !image){
      return res.status(400).json({message:"Text or image  is required"})
    }

    if(senderId.equals(receiverId)){
      return res.status(400).json({message:"Can not send message to yourself"})
    }
    const receiverExists = await User.exists({_id:receiverId});
    if(!receiverExists){
      return res.status(404).json({message:"Receiver not found "})
    }

    let imageUrl;


    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // todo: send message in real time if user is online - socket.io

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    //find all messages where the logged-in user is either sender or receiver
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnerIds =[ ...new Set(messages.map((msg) => 
      msg.senderId.toString() === loggedInUserId.toString()
        ? msg.receiverId.toString()
        : msg.senderId.toString()
    )),];

    const chatPartners = await User.find({_id:{$in:chatPartnerIds}}).select("-password")

    res.status(200).json(chatPartners)

  } catch (error) {
    console.error("Error in getChatPartners:", error.message);
    res.status(500).json({error:"internal server error"})
  }
};
