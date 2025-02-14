import { CustomerRepo } from "../repositories/index.js";

const getallCustomer = async(req, res) => {
    try{
        res.status(200).json(await CustomerRepo.listCustomer());
    }catch(error){
        res.status(500).json({
            message: error.toString(),
        })
    }
};

const getCustomerByName = async(req, res) => {
    try{
        res.status(200).json(await CustomerRepo.getById(req.params.id));
    }catch(error){
        res.status(500).json({
            message: error.toString(),
          });
    }
};

const createCustomer = async(req, res) => {
    try {
        const{
            name,
            phone,
            email,
            address,
        } =req.body;
        const newCustomer = await CustomerRepo.createCustomer
        ({
            name,
            phone,
            email,
            address,
        });
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({message: error.toString()});
    }
};

const editCustomer =async (req, res) => {
    try {
        res.status(200).json(await CustomerRepo.edit(req.params.id, req.body));
    } catch (error) {
        res.status(500).json({
            error: error.toString(),
        });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        res.status(200).json(await CustomerRepo.deleteCustomer(req.params.id));
    } catch (error) {
        res.status(500).json({
            error: error.toString(),
        });
    }
};

export default{
    getallCustomer,
    getCustomerByName,
    createCustomer,
    editCustomer, 
    deleteCustomer,
}