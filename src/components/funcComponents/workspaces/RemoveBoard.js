import "./RemoveBoard.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../Modal";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import workspacesApi from "../../../services/workspacesApi";
import { useTranslation } from "react-i18next";

const mapStateToProps = (state) => ({
	workspaces: state.workspacesDuck.workspaces,
	userId: state.userMeDuck.user.id,
});

const RemoveBoard = (props) => {
	const [state, setState] = React.useState({
		showModal: false,
	});

	const {t} = useTranslation();

	const hideModal = () => {
		setState({ ...state, showModal: false });
	};

	const showModal = (e) => {
		e.stopPropagation();

		setState({ ...state, showModal: true });
	};

	const deleteBoard = (e) => {
		e.stopPropagation();
		let workspace = props.workspaces.find(
			(w) => w.id === props.workspaceId
		);

		workspace.boards = workspace.boards.filter(
			(b) => b.id !== props.boardId
		);

		workspacesApi
			.update(workspace, props.userId, props.dispatch)
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
		<div className={props.classNameContainer}>
			<span onClick={showModal} style={{ cursor: "pointer" }}>
				<FontAwesomeIcon icon={faTrash} size="lg" />
			</span>
			{state.showModal && (
				<Modal className="board-confirm-delete-modal">
					<p>{t("RemoveBoard.Title")}</p>
					<p>{t("RemoveBoard.Subtitle")}</p>
					<div>
						<button onClick={hideModal}>{t("RemoveBoard.No")}</button>
						<button onClick={deleteBoard}>{t("RemoveBoard.Yes")}</button>
					</div>
				</Modal>
			)}
		</div>
	);
};

RemoveBoard.defaultProps = {
	classNameContainer: "",
};

RemoveBoard.propTypes = {
	boardId: PropTypes.number.isRequired,
	classNameContainer: PropTypes.string,
	workspaceId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(RemoveBoard);
