import './styles.css';

type Props = {
    title: string;
    description: string;
}

const ProfileInfo = ( { title, description} : Props) => {

    return (
        <div className="profile-info-container">
            <h3 className="profile-info-title">{`${title}: `}</h3>
            <p className="profile-info-description">{description}</p>
        </div>
    );
}

export default ProfileInfo;