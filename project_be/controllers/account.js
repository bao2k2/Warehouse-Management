import { AccountRepo } from "../repositories/index.js";
import { signAccessToken, signRefreshToken } from "../jwt_helper.js";
import createError from "http-errors";
// GET: /accounts
const getAccount = async (req, res) => {
  try {
    res.status(200).json(await AccountRepo.list());
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};
const getAccountById = async (req, res) => {
  try {
    res.status(200).json(await AccountRepo.getById(req.params.id));
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};
// POST: /accounts
const createAccount = async (req, res) => {
  try {
    // Get object from request body

    const {
      username,
      email,
      password,
      dob,
      gender,
      phoneNumber,
      avatar,
      role_id,
    } = req.body;
    const newUser = await AccountRepo.create({
      username,
      email,
      password,
      dob,
      gender,
      phoneNumber,
      avatar,
      role_id,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
// PUT: /accounts/1
const editAccount = async (req, res) => {
  try {
    res.status(200).json(await AccountRepo.edit(req.params.id, req.body));
  } catch (error) {
    res.status(500).json({});
  }
};
const loginAccount = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw createError.BadRequest(`Invalid Username/Password`);

    const existUser = await AccountRepo.loginAccount(username);
    if (!existUser) throw createError.NotFound("User not registered");

    if (password !== existUser.password)
      throw createError.Unauthorized(`Username/Password not valid`);

    const accessToken = await signAccessToken(existUser.id);
    const refreshToken = await signRefreshToken(existUser.id);
    res.send({ accessToken, refreshToken, existUser });
  } catch (error) {
    next(error);
  }
};
  // DELETE: /accounts/1
  const deleteAccount = async (req, res) => {
    try {
      res.status(200).json(await AccountRepo.deleteAccount(req.params.id));
    } catch (error) {
      res.status(500).json({
        error: error.toString(),
      });
    }
  };
  export default {
    getAccount,
    getAccountById,
    createAccount,
    editAccount,
    deleteAccount,
    loginAccount,
  };

