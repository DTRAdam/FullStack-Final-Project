import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import EditProduct from "./EditProduct";

interface EditProductModalProps {
    show: boolean
    onHide: Function
    refresh: Function
    productId: string
}

const EditProductModal: FunctionComponent<EditProductModalProps> = ({ show, onHide, refresh, productId }) => {
    return (
        <>
            <Modal
                show={show}
                onHide={() => onHide()}
                refresh={refresh}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="w-100 text-center " id="contained-modal-title-vcenter">
                        <h1 className="text-dark">Add <i className="fa-regular text-dark fa-id-card"></i></h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {<EditProduct onHide={onHide} refresh={refresh} productId={productId} />}
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditProductModal;