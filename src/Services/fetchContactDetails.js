import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

// countryId - US - 226
export const getAllContactList = async ({
  companyId = 171,
  countryId,
  page = 1,
  query = "",
}) => {
  const url = `${baseUrl}?companyId=${companyId}&countryId=${
    countryId ?? ""
  }&page=${page}&query=${query}`;

  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  return res.data;
};
