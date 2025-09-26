import { FunctionComponent } from "react";
import useUsers from "../hooks/useUsers";

interface ProfileProps {

}

const Profile: FunctionComponent<ProfileProps> = () => {
    const { users } = useUsers()
    return (
        <>
            {users.map((user) => (
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={user._id}>
                            <th>{user.email}</th>
                            <th>{user.phone}</th>
                        </tr>
                    </tbody>
                </table>
            ))}
        </>
    );
}

export default Profile;