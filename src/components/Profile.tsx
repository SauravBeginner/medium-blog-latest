import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <Link
        rel="preload"
        as="image"
        to="https://images.pexels.com/photos/7775642/pexels-photo-7775642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <Link
        rel="preload"
        as="image"
        to="https://images.pexels.com/photos/18107024/pexels-photo-18107024/free-photo-of-an-old-city-view.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <Link
        rel="preload"
        as="image"
        to="https://images.pexels.com/photos/18107025/pexels-photo-18107025/free-photo-of-man-reading-newspaper.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <Link
        rel="preload"
        as="image"
        to="https://images.pexels.com/photos/18148933/pexels-photo-18148933/free-photo-of-city-road-man-people.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <Link
        rel="preload"
        as="image"
        to="https://images.pexels.com/photos/18148937/pexels-photo-18148937/free-photo-of-city-road-traffic-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
    </>
  );
};

export default Profile;
