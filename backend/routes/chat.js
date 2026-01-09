import express from "express";
const router = express.Router();
import Thread from "../models/Thread.js"

//test
router.post("/test", (req, res) => {
    res.json({ message: "Hello from the server!" });
});

router.get("/thread", async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({ updatedAt: -1 });
        res.json(threads);

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Failed to save in DataBase" })
    }
})


router.get("/thread/:threadId", async (req, res) => {

    const { threadId } = req.params;

    try {

        const thread = await Thread.findOne({ threadId })
        if (!thread) {
            res.status(404).json({ err: "Thread not FOund" });
            return;
        }
        res.json(thread.messages);

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Could not Find Thread" });
    }

});

router.delete("/thread/:threadId", async (req, res) => {

    const { threadId } = req.params;

    try {
        const deletedThread = await Thread.findOneAndDelete({ threadId });
        if (!deletedThread) {
            return res.status(400).json({ err: "Thread Not Found" });
        }
        res.status(200).json({ success: "Thread Deleted Successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Thread Not Found" });
    }

});

export default router;
