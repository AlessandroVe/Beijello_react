import "./RemoveWorkspace.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../Modal";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import workspacesApi from "../../../services/workspacesApi";
import { useTranslation } from "react-i18next";

const RemoveWorkspace = (props) => {
	const [state, setState] = React.useState({
		showModal: false,
	});

	const { t } = useTranslation();
	const hideModal = () => {
		setState({ ...state, showModal: false });
	};

	const showModal = () => {
		setState({ ...state, showModal: true });
	};

	const deleteWorkspace = () => {
		workspacesApi
			.deleteById(props.workspaceId, props.dispatch)
			.catch((err) =>
				toast.error(err.message, {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				})
			);

		hideModal();
	};

	return (
		<div>
			<div className="workspace-delete">
				<FontAwesomeIcon icon={faTrash} onClick={showModal} />
			</div>
			{state.showModal && (
				<Modal className="workspace-confirm-delete-modal">
					<p>
						{t("RemoveWorkspace.Title")}
					</p>
					<p>{t("RemoveWorkspace.Subtitle")}</p>
					<div>
						<button onClick={hideModal}>{t("RemoveWorkspace.No")}</button>
						<button onClick={deleteWorkspace}>
						{t("RemoveWorkspace.Yes")}
						</button>
					</div>
				</Modal>
			)}
		</div>
	);
};

RemoveWorkspace.propTypes = {
	workspaceId: PropTypes.number.isRequired,
};

export default connect()(RemoveWorkspace);
