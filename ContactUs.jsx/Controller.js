import { contactModel } from "./Model.js"

export const ContactSave = async (req, res) => {
    try {
        console.log(req.body);

        const { name, email, whatsappNo, message } = req.body
        await contactModel.create({ name, email, whatsappNo, message })

        res.status(201).json({
            success: true,
            message: "Contact details saved successfully"
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await contactModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            contacts
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getContactStats = async (req, res) => {
    try {
        const totalContacts = await contactModel.countDocuments();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayContacts = await contactModel.countDocuments({
            createdAt: { $gte: today }
        });
        
        res.status(200).json({
            success: true,
            stats: {
                totalContacts,
                todayContacts
            }
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await contactModel.findById(id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }
        
        await contactModel.findByIdAndDelete(id);
        
        res.status(200).json({
            success: true,
            message: "Contact deleted successfully"
        });
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        });
    }
}