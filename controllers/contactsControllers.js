import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/ctrlWrapper.js";

const getAllContacts = async (_, res) => {
  const contacts = await contactsService.listContacts();
  res.status(200).json(contacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);

  if (!contact) throw HttpError(404);

  res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.removeContact(id);

  if (!contact) throw HttpError(404);

  res.status(200).json(contact);
};

const createContact = async (req, res) => {
  const contact = await contactsService.addContact(req.body);

  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;

  const contact = await contactsService.updateContactById(id, req.body);
  if (!contact) throw HttpError(404);

  res.status(200).json(contact);
};

export default {
  getAllContacts: controllerWrapper(getAllContacts),
  getOneContact: controllerWrapper(getOneContact),
  deleteContact: controllerWrapper(deleteContact),
  createContact: controllerWrapper(createContact),
  updateContact: controllerWrapper(updateContact),
};
