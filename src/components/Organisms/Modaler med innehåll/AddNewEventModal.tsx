
import Modal from '../Modal/Modal'
import AddNewEventForm from '../AddNewEventForm/AddNewEventForm'

type Props = {
    isOpen: boolean;
    onCloseModal: () => void;
};

const AddNewEventModal = ({ isOpen, onCloseModal }: Props) => {
    return (
        <Modal isOpen={isOpen}
            children={<AddNewEventForm onCancel={onCloseModal} onEventCreated={onCloseModal} />}
            footerContent={undefined}
            title={"Skapa nytt event"}
            onCloseModal={onCloseModal}
            type={"drawer"}
            size={'large'} />
    )
}

export default AddNewEventModal