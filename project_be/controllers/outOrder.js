import { OutOrderRepo } from "../repositories/index.js";
const getAll = async (req, res) => {
    try {
      res.status(200).json(await OutOrderRepo.list());
    } catch (error) {
      res.status(500).json({
        message: error.toString(),
      });
    }
  };
  
  // GET: /products/1
  const getById = async (req, res) => {
    try {
      res.status(200).json(await OutOrderRepo.getById(req.params.id));
    } catch (error) {
      res.status(500).json({
        message: error.toString(),
      });
    }
  };
  
  const getByProductId = async (req, res) => {
    try {
      res.status(200).json(await OutOrderRepo.getByCode(req.params.id));
    } catch (error) {
      res.status(500).json({
        message: error.toString(),
      });
    }
  };
  
  const getByCustomer = async (req, res) => {
    try {
      res.status(200).json(await OutOrderRepo.getByCustomer(req.params.id));
    } catch (error) {
      res.status(500).json({
        message: error.toString(),
      });
    }
  };
  
  // POST: /products
  const create = async (req, res) => {
    try {
      // Get object from request body
  
      const {
        product,
        customer,
        out_price,
        quantity_real,
        quantity_doc,
        staff, 
        receiver,
        invoice,
      } = req.body;
      const newUser = await OutOrderRepo.create({
        product,
        customer,
        out_price,
        quantity_real,
        quantity_doc,
        staff, 
        receiver,
        invoice,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.toString() });
    }
  };
  
  // PUT: /products/1
  const edit = async (req, res) => {
    try {
      res.status(200).json(await OutOrderRepo.edit(req.params.id, req.body));
    } catch (error) {
      res.status(500).json({
        error: error.toString(),
      });
    }
  };
  
  // DELETE: /products/1
  const del = async (req, res) => {
    try {
      res.status(200).json(await OutOrderRepo.delete(req.params.id));
    } catch (error) {
      res.status(500).json({
        error: error.toString(),
      });
    }
  };
  const getByDate = async (req, res) => {
    try {
        const orders = await OutOrderRepo.getByDate(req.params.date);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};

const getByMonth = async (req, res) => {
  try {
      const { year, month } = req.params;
      const orders = await OutOrderRepo.getByMonth(year, month);
      res.status(200).json(orders);
  } catch (error) {
      res.status(500).json({ message: error.toString() });
  }
};
  
  
  export default {
   getAll,
   getById,
   getByProductId,
   getByCustomer,
   create,
   edit,
   del,
   getByDate,
   getByMonth,
  };