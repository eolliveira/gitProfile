import ProfileInfo from 'components/ProfileInfo';
import { useState } from 'react';
import axios from 'axios';
import CardLoader from 'components/CardLoader';

import './styles.css';

const ProfileSearch = () => {
  type FormData = {
    user: string;
  };

  type Profile = {
    url: string;
    name: string;
    location: string;
    followers: string;
    avatar_url: string;
  };

  const [formData, setFormData] = useState<FormData>({ user: '' });
  const [profile, setProfile] = useState<Profile>();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="git-search-container">
      <div className="search-container">
        <h1>Encontre um perfil Github</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();

            setIsLoading(true);
            axios
              .get(`https://api.github.com/users/${formData.user}`)
              .then((response) => {
                console.log(response.data);
                setProfile(response.data);
              })
              .catch((error) => {
                setProfile(undefined);
              })
              .finally(() => {
                setIsLoading(false);
              });
          }}
        >
          <div className="form-container">
            <input
              type="text"
              name="user"
              value={formData.user}
              className="search-input"
              placeholder="Usuário Github"
              onChange={(event) => {
                //atualiza valores e muda o estado
                setFormData({ ...formData, [event.target.name]: event.target.value });
              }}
            />
            <button type="submit" className="btn btn-primary search-button">
              Encontrar
            </button>
          </div>
        </form>

        {isLoading ? (
          <CardLoader />
        ) : (
          profile && (
            <div className="result-cotainer">
              <div className="result-image">
                <img src={profile?.avatar_url} alt="" />
              </div>
              <div className="result-data">
                <h2>Informações</h2>

                <>
                  <ProfileInfo title="Perfil" description={profile?.url} />
                  <ProfileInfo
                    title="Seguidores"
                    description={profile?.followers}
                  />
                  <ProfileInfo
                    title="Localidade"
                    description={profile?.location}
                  />
                  <ProfileInfo title="Nome" description={profile?.name} />
                </>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProfileSearch;
