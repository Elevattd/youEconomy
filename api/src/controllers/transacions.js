const { User, Transaction } = require("../db.js");
const { Op } = require("sequelize");

const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      include: [{ association: "user" }],
    });
    res.status(200).send(transactions);
  } catch (error) {
    next(error);
  }
};

const createTransaction = async (req, res, next) => {
  const { userId } = req.params;
  const { concept, value, type, date } = req.body;
  const user = await User.findByPk(userId);

  try {
    if (!user) {
      return res.status(400).send({ msg: `UserID: ${userId} missmatch` });
    } else {
      const newTransaction = await user.createTransaction({
        concept,
        value,
        type,
        date,
      });
      res.status(200).send(newTransaction);
    }
  } catch (error) {
    next(error);
  }
};

const getTransactionsById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const userTransactions = await Transaction.findByPk(id);
    if (userTransactions === null || userTransactions.length === 0) {
      res.status(400).send({ msg: "No transactions for this id" });
    } else {
      res.status(200).send(userTransactions);
    }
  } catch (error) {
    next(error);
  }
};

const getCurrentTransaction = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const transaction = await Transaction.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
    transaction
      ? res.send(transaction)
      : res.status(404).send(`Operation not found with id: ${id}`);
  } catch (error) {
    next.log(error);
  }
};

const getHistory = async (req, res, next) => {
  const { userId } = req.params;
  const { type } = req.query;
  try {
    let options = {
      where: { userId },
      order: [["createdAt", "DESC"]],
    };
    if (type) options = { ...options, where: { userId, type } };
    const transactions = await Transaction.findAll(options);
    transactions
      ? res.send(transactions)
      : res
          .status(404)
          .send(`None transactions were found with userId: ${userId}`);
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  const { userId } = req.params;
  const { id } = req.body;
  try {
    const transaction = await Transaction.findByPk(id);

    const user = await User.findByPk(userId);
    if (!user) {
      res.status(401).send({ msg: "User not found" });
    }
    if (!transaction) {
      res
        .status(400)
        .send({ msg: `User: ${userId}, has no transactions/or not match` });
    }
    if (transaction.dataValues.userId != userId) {
      res
        .status(400)
        .send({ msg: `Transaction: ${userId}, not exist/or not match` });
    } else {
      user.removeTransaction(transaction);
      transaction.destroy();
      return res.status(204).send({
        msg: `Transaction has been deleted successfully`,
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
  const { id } = req.params;
  const { concept, value, date } = req.body;
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      res.status(400).send({ msg: `Transaction ${id} does not exist` });
    } else {
      transaction.update({ concept, value, date });
      return res
        .status(200)
        .send({ msg: `Transaction ${id} updated successfully` });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getTransactions,
  createTransaction,
  getTransactionsById,
  getCurrentTransaction,
  getHistory,
  deleteTransaction,
  updateTransaction,
};
