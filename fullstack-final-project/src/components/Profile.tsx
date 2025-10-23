import { FunctionComponent } from "react";
import useUsers from "../hooks/useUsers";
import { Users } from "../interfaces/users";

interface ProfileProps { }

const Profile: FunctionComponent<ProfileProps> = () => {
    const { allUsers } = useUsers();

    console.log(allUsers);

    return (
        <table className="profileTable">
            <thead>
                <tr>
                    <th className="fs-2">Email</th>
                    <th className="fs-2">Phone</th>
                </tr>
            </thead>
            <tbody>

                {allUsers.map((user: Users) => (
                    <tr key={user._id}>
                        <td className="w-1 text-light fs-2">{user.email}</td>
                        <td className="w-1 text-light fs-2">{user.phone}</td>
                        <button onClick={() => {
                            console.log(user);

                        }} ></button>
                    </tr>
                ))}

            </tbody>
        </table>
    );
};

export default Profile;