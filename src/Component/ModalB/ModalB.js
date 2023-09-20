import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getAllContactList } from "../../Services/fetchContactDetails";
import style from "../../assets/styles/Modal.module.css";
import Spinner from "react-bootstrap/Spinner";
import ContactDetailsModal from "../ModalC/ContactDetailsModal";
import Form from "react-bootstrap/Form";

let debounceTimeout;

function ModalB({ showModalB, setShowModalA, setActiveTab, setShowModalB }) {
  // contacts_ids, contacts
  const [loading, setLoading] = useState(false);
  const [onlyEven, setOnlyEven] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [evenFilteredId, setEvenFilteredId] = useState([]);
  const [currentContactDetails, setCurrentContactDetails] = useState({});
  const [contactIdList, setConstactIdList] = useState([]);
  const [contactDetails, setConatctDetails] = useState(null);
  const [queryText, setQueryText] = useState("");
  const [loadingOnScroll, setLoadingOnScroll] = useState(false);

  const totalPage = useRef(null);
  const currentPage = useRef(1);
  const modalBodyRef = useRef(null);

  const handleClose = () => {
    if (!loading) {
      setShowModalB(false);
      window.history.pushState(null, "", "/");
    }
  };

  // Handle input change with debouncing
  const handleQueryTextChange = (e) => {
    currentPage.current = 1;
    const newQuery = e.target.value;
    setQueryText(newQuery);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      searchAPI(newQuery);
    }, 1000);
  };

  // handle input Enter key
  const handleEnterKey = (e) => {
    if (!loading) {
      if (e.key === "Enter") {
        searchAPI(queryText);
      }
    }
  };

  // Function to make the API call
  async function searchAPI(query) {
    try {
      setLoading(true);
      const response = await getAllContactList({
        companyId: 171,
        countryId: 226,
        query: query,
      });
      setOnlyEven(false);
      setConatctDetails(response.contacts);
      setConstactIdList(response.contacts_ids);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  const getAllContactLists = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      // fetching US country data
      const contactData = await getAllContactList({
        companyId: 171,
        countryId: 226,
      });
      console.log(contactData);
      totalPage.current = contactData.total;
      setConatctDetails(contactData.contacts);
      setConstactIdList(contactData.contacts_ids);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const modalBody = modalBodyRef.current;
    if (modalBody) {
      if (
        modalBody.scrollHeight - modalBody.scrollTop ===
        modalBody.clientHeight
      ) {
        if (!loadingOnScroll && !loading) {
          onScrollLoadData(queryText);
        }
      }
    }
  };

  const onScrollLoadData = async (query) => {
    if (totalPage.current && totalPage.current <= currentPage.current) {
      return;
    }
    setLoadingOnScroll(true);
    try {
      currentPage.current += 1;
      const response = await getAllContactList({
        query: query,
        page: currentPage.current,
      });
      setOnlyEven(false);
      setConatctDetails((old) => {
        return { ...old, ...response.contacts };
      });
      setConstactIdList((old) => {
        return [...old, response.contacts_ids];
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOnScroll(false);
    }
  };

  useEffect(() => {
    // initial loading data
    getAllContactLists();

    return () => {
      // clearing state data
      setConstactIdList([]);
    };
  }, []);

  useEffect(() => {
    if (onlyEven) {
      const filterData = contactIdList.filter((item) => {
        return parseInt(item) % 2 === 0;
      });
      setEvenFilteredId([...filterData]);
    } else {
      setEvenFilteredId([]);
    }
  }, [onlyEven]);

  return (
    <>
      {showModalC && (
        <ContactDetailsModal
          showModalC={showModalC}
          setShowModalC={setShowModalC}
          data={currentContactDetails}
        />
      )}
      <Modal
        show={showModalB}
        onHide={handleClose}
        onShow={() => modalBodyRef.current.scrollTo(0, 0)}
        scrollable
      >
        <Modal.Header>
          <Modal.Title>Modal B</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
          onScroll={handleScroll}
          ref={modalBodyRef}
        >
          <div className={`${style.modalButtonDiv}`}>
            <Button
              style={{
                backgroundColor: "var(--buttonAColor)",
                borderColor: "transparent",
              }}
              onClick={() => {
                setActiveTab(1);
                setShowModalB(false);
                setShowModalA(true);
                window.history.pushState(null, "", "/modal-a");
              }}
            >
              All Contacts
            </Button>
            <Button
              style={{
                backgroundColor: "var(--buttonBColor)",
                borderColor: "transparent",
              }}
              onClick={() => {
                window.history.pushState(null, "", "/modal-b");
              }}
            >
              US Contacts
            </Button>
            <Button
              onClick={handleClose}
              style={{
                backgroundColor: "white",
                borderColor: "var(--buttonAColor)",
                color: "black",
              }}
            >
              Close
            </Button>
          </div>
          {/* Search Input field */}
          <div style={{ margin: "20px 0px" }}>
            <Form.Label htmlFor="inputText">Search</Form.Label>
            <Form.Control
              type="text"
              id="inputText"
              value={queryText}
              onChange={handleQueryTextChange}
              onKeyDown={handleEnterKey}
            />
          </div>
          {/* Display Loading data */}
          {loading && (
            <div className={style.conatctListBody}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          {/* Display No Data Found! */}
          {!loading && contactIdList.length === 0 && <div>No Data Found!</div>}

          {/* Display Contact Id's in Button */}
          <div className={!loading ? style.conatctListBody : ""}>
            {evenFilteredId.length === 0 &&
              contactIdList.map((item) => {
                return (
                  <Button
                    style={{
                      backgroundColor: `${
                        contactDetails[item]?.color
                          ? `${contactDetails[item]?.color}`
                          : ""
                      }`,
                    }}
                    onClick={() => {
                      setCurrentContactDetails(contactDetails[item]);
                      setShowModalC(true);
                    }}
                    key={item}
                  >
                    {item}
                  </Button>
                );
              })}
            {/* Display onlyEven contact Id's data */}
            {!loading &&
              evenFilteredId.map((item) => {
                return (
                  <Button
                    style={{
                      backgroundColor: `${
                        contactDetails[item]?.color
                          ? `${contactDetails[item]?.color}`
                          : ""
                      }`,
                    }}
                    key={item}
                    onClick={() => {
                      setCurrentContactDetails(contactDetails[item]);
                      setShowModalC(true);
                    }}
                  >
                    {item}
                  </Button>
                );
              })}
          </div>
          {/* Display Loading on Scroll */}
          {loadingOnScroll && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Modal.Body>
        <Modal.Footer>
          {/* Checkbox for only even items for filtering data  */}
          <div className={`${style.footerCheckBox}`}>
            <input
              type="checkbox"
              name="onlyeven"
              id="onlyEven"
              value={onlyEven}
              onChange={(e) => {
                setOnlyEven(e.target.checked);
              }}
            />
            <label htmlFor="onlyEven" style={{ margin: "0px 0px 2px 0px" }}>
              Only Even
            </label>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalB;
