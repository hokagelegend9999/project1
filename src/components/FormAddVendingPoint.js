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
                <label className="label">Product Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={productname}
                    onChange={(e) => setProductname(e.target.value)}
                    placeholder="Productname"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Meter Type</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={metertype}
                    onChange={(e) => setMetertype(e.target.value)}
                    placeholder="Metertype"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Manufakturer</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    placeholder="Manufacturer"
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
