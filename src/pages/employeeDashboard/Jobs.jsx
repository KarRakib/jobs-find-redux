import { useState } from "react";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";
import { useJobCloseMutation } from "../../Redux/features/Job/JobApi";


const Jobs = ({ data }) => {
  const { _id, position, employmentType, applicants,jobs } = data || {};

  const [closeJob,{data:mydata}] = useJobCloseMutation()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); // Store the selected user ID
  console.log(jobs);
  const jobClose = () =>{
    const data ={
      id : _id,
      jobs:false
    }

    closeJob(data)
    
    console.log(data);
    console.log(mydata);
  }
  const openModal = (id) => {
    setSelectedUserId(id); // Set the selected user ID
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUserId(null); // Reset the selected user ID when closing the modal
    setIsModalOpen(false);
  };


  return (
    <div
      key={_id}
      className="border border-gray-300 shadow-xl p-5 rounded-2xl text-primary"
    >
      <div className="flex justify-between text-primary">
        <div>
          <p className="text-xl">
            Job Title: <span>{position}</span>
          </p>
          <small className="text-primary/70 ">
            Applied by{" "}
            <div className="inline">
              {applicants.map((apply) => (
                <Link 
                // to={`/dashboard/my-jobs/${apply.id}`}
                  key={apply.id}
                  onClick={() => openModal(apply.id)}
                  className="font-semibold hover:text-primary cursor-pointer hover:underline transition-all"
                >
                  {apply.email}
                </Link>
              ))}
            </div>
          </small>
        </div>
        <p>Applied {applicants?.length}</p>
      </div>
      <div className="flex justify-between items-center mt-5">
        <p>{employmentType}</p>
        <button className="btn" onClick={jobClose}>
          Close
        </button> 
      </div>

      {/* Render the modal with user data */}
      
        {selectedUserId && (
          <Modal isOpen={isModalOpen} id={selectedUserId} jobId={_id} onClose={closeModal}> </Modal>
        )}
      
    </div>
  );
};

// Create a UserDetails component to fetch and display user data


export default Jobs;
