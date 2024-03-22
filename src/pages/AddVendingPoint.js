import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddVendingPoint = () => {
  const [pointname, setPointname] = useState("");
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");
  const [contactperson, setContactperson] = useState("");
  const [tlp, setTlp] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveVendingPoint = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/vendngpoints", {
        pointname: pointname,
        region: region,
        address: address,
        contactperson: contactperson,
        tlp: tlp,
        email: email,
      });
      navigate("/vendingpoints");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Vending Point</h1>
      <h2 className="subtitle">Create</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveVendingPoint}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Point Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={pointname}
                    onChange={(e) => setPointname(e.target.value)}
                    placeholder="Point Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Region</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="region"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Address</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Contact Person</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={contactperson}
                    onChange={(e) => setContactperson(e.target.value)}
                    placeholder="Contact Person"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Phone Number</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={tlp}
                    onChange={(e) => setTlp(e.target.value)}
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddVendingPoint;
