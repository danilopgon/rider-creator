import VenueRegisterForm from "../components/VenueRegisterForm";

const CreateVenue = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-cover bg-[url('https://images.pexels.com/photos/2078076/pexels-photo-2078076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]">
      <div className="w-4/5 md:w-2/5 bg-base-100 p-10 rounded-lg my-10">
        <h1 className="mb-5 text-5xl font-bold">Crear sala</h1>
        <VenueRegisterForm />
      </div>
    </div>
  );
};

export default CreateVenue;
