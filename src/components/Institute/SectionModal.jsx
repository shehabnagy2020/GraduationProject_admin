import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as $ from "jquery";
import editInstitute from "../../store/actions/editInstitute";
import CircualarProgress from "../Loaders/CircualarProgress";

const SectionModal = ({
  editing,
  setEditing,
  instituteEdit,
  pageErrors,
  pageLoaders,
}) => {
  const handleChange = (e) => {
    setEditing({ ...editing, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    $(document).scrollTop(250);
    $("body").css("overflow", "hidden");
    return () => {
      $("body").css("overflow", "auto");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    instituteEdit(editing, setEditing);
  };
  return (
    <>
      <div className="backdrop" onClick={(_) => setEditing({})} />
      <article className="modal">
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">
              <span>edit institute</span>
            </div>
            <button className="modal-close-btn" onClick={(_) => setEditing({})}>
              <i className="fa fa-close" />
            </button>
          </div>
          <form className="modal-body" onSubmit={handleSubmit}>
            <div className="modal-form b-0">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Name"
                  id="name"
                  value={editing.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="btns-container">
              <CircualarProgress condition={pageLoaders.editInstitute}>
                <button className="btn btn-primary center">edit</button>
              </CircualarProgress>
            </div>
          </form>
        </div>
      </article>
    </>
  );
};

const mapStateToProps = (state) => ({
  isRTL: state.isRTL,
  symbol: state.symbol,
  pageLoaders: state.pageLoaders,
  pageErrors: state.pageErrors,
});

const mapDispatchToProps = (dispatch) => ({
  instituteEdit: async (obj, setEditing) =>
    dispatch(editInstitute(obj, setEditing)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionModal);
