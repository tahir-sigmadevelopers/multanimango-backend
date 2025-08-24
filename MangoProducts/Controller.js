import { MangoModel } from "./Model.js";
import cloudinary from 'cloudinary';

export const SaveMango = async (req, res) => {
  try {
    console.log(req.body, "data is coming");

 let cloudinaryRes;
if(req.body.image){
    cloudinaryRes = await cloudinary.v2.uploader.upload(req.body.image,{
        folder:"Multani- mango",
        crop:"scale"
    });
}

    const { name, price, description } = req.body;

    await MangoModel.create({
      name,
      price,
      description,
      image:{
        public_id: cloudinaryRes.public_id,
        url:cloudinaryRes.secure_url,
      },
    
    });

    res.status(201).json({
      success: true,
      message: "Data saved successfully",
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getMango = async (req, res) => {
    try {
        console.log(req.body);


        const allData = await MangoModel.find()
        res.status(200).json({
            success: true,
            allData
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })

    }
}

export const getSingleMango = async (req, res) => {
    try {
        const { id } = req.params
        const singleMango = await MangoModel.findById(id)
        res.status(200).json({
            success: true,
            singleMango,

        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })

    }
}

export const deleteMango = async (req, res) => {
    try {
        const { id } = req.params
        const mangoData = await MangoModel.findById(id)
        if (!mangoData) {
            return res.status(404).json({
                success: false,
                message: "user not found this id"
            })

        }
        await MangoModel.deleteOne({ _id: id })
        return res.status(200).json({
            success: true,
            message: "id Recieved successfully"
        })
    } catch (error) {
        console.log(error.message);

    }
}

export const editMangos = async (req, res) => {
    try {
        const { id } = req.params
        const userData = await MangoModel.findById(id)
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "Id is not Updated"
            })
        }
        console.log(userData);
        const { name, price, description } = req.body
        if (name) {
            userData.name = name

        }
        if (price) {
            userData.price = price

        }

        if (description) {
            userData.description = description
        }
        await userData.save()
        return res.status(200).json({
            success: true,
            message: "item Updated successfully"
        })


    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getMangoStats = async (req, res) => {
    try {
        const totalMangoes = await MangoModel.countDocuments();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayMangoes = await MangoModel.countDocuments({
            createdAt: { $gte: today }
        });
        
        res.status(200).json({
            success: true,
            stats: {
                totalMangoes,
                todayMangoes
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