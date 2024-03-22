import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddProduct = () => {
  const [productname, setProductname] = useState("");
  const [productmodel, setProductmodel] = useState("");
  const [metertype, setMetertype] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/products", {
        productname: productname,
        productmodel: productmodel,
        metertype: metertype,
        manufacturer: manufacturer,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">Add New Product</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Product Model</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={productmodel}
                    onChange={(e) => setProductmodel(e.target.value)}
                    placeholder="Product Model"
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

export default FormAddProduct;
