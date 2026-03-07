import { FunctionComponent } from "react";
import useUsers from "../hooks/useUsers";
import { Users } from "../interfaces/users";

interface ProfileProps { }

const Profile: FunctionComponent<ProfileProps> = () => {
    const { userProfile } = useUsers();

    return (
        <div className="container d-flex justify-content-center mt-5 mb-5" data-aos="fade-in">
            {userProfile ? (
                <div className="profile-id-card glass-panel p-4 text-center">
                    <div className="profile-header mb-4">
                        <img
                            src={userProfile.image?.url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                            alt={userProfile.name?.first || "Profile"}
                            className="profile-avatar border border-3 border-danger shadow"
                        />
                        <h2 className="mt-3 text-white fw-bold">
                            {userProfile.name?.first} {userProfile.name?.middle} {userProfile.name?.last}
                        </h2>
                        {userProfile.isAdmin && <span className="badge bg-danger mb-2 p-2">Administrator</span>}
                    </div>

                    <div className="profile-details text-start">
                        <div className="detail-item mb-3">
                            <i className="fa-solid fa-envelope text-danger fs-4 me-3"></i>
                            <span className="fs-5 text-light">{userProfile.email}</span>
                        </div>
                        <div className="detail-item mb-3">
                            <i className="fa-solid fa-phone text-danger fs-4 me-3"></i>
                            <span className="fs-5 text-light">{userProfile.phone}</span>
                        </div>
                        <div className="detail-item mb-3">
                            <i className="fa-solid fa-location-dot text-danger fs-4 me-3"></i>
                            <span className="fs-6 text-light lh-lg">
                                {userProfile.address?.street} {userProfile.address?.houseNumber}, {userProfile.address?.city}, {userProfile.address?.state} {userProfile.address?.country}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center text-light mt-5">
                    <div className="spinner-border text-danger" role="status"></div>
                    <p className="mt-2 text-muted">Loading profile...</p>
                </div>
            )}
        </div>
    );
};

export default Profile;