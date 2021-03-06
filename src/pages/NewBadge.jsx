import React, { useState, useEffect } from 'react';
import BadgeForm from '../features/badges/badgeForm';
import Badge from '../features/badges/badge';
import { useForm } from 'react-hook-form';
import api from '../api/api.js';
import { useHistory } from 'react-router-dom';
import PageLoading from '../features/loaders/pageLoading';
import defaultBackgroundImage from '../assets/default-background-image.png';
import defaultImage from '../assets/default-image.png';
import PageError from '../pages/PageError';

function NewBadge(props) {
  const { register, handleSubmit, errors, watch, formState } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { eventId } = props.match.params;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const watchAllFields = watch();
  const [picture, setPicture] = useState(defaultImage);

  useEffect(() => {
    const getEventLogo = () => {
      const eventLogo = localStorage.getItem('event-logo');
      if (eventLogo !== 'undefined') {
        setPicture(eventLogo);
      }
    };

    getEventLogo();
  }, []);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.badges.create(data, eventId);
      setLoading(false);

      history.push(`/${eventId}/badges`);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  if (loading) {
    return <PageLoading />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  return (
    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column"></div>
          <div className="column is-one-third">
            <Badge
              firstName={watchAllFields.firstName || 'FIRST NAME'}
              lastName={watchAllFields.lastName || 'LAST NAME'}
              email={watchAllFields.email || 'EMAIL'}
              jobTitle={watchAllFields.jobTitle || 'JOBTITLE'}
              categorie={watchAllFields.categorie || 'CATEGORIE'}
              badgeImage={watchAllFields.badgeImage || defaultBackgroundImage}
              eventLogo={picture}
            />
          </div>
          <div className="column is-two-fifths">
            <h3 className="title is-3">New Badge</h3>
            <BadgeForm
              onSubmit={handleSubmit(onSubmit)}
              register={register}
              errors={errors}
              formState={formState}
              eventId={eventId}
            />
          </div>
          <div className="column"></div>
        </div>
      </div>
    </div>
  );
}

export default NewBadge;
