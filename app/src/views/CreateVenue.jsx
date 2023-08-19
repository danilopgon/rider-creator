import VenueRegisterForm from "../components/VenueRegisterForm";

const CreateVenue = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-cover bg-[url('https://images.pexels.com/photos/2078076/pexels-photo-2078076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] animate-fade">
      <div className="w-full md:w-3/5 backdrop-blur-md bg-base-200/50 p-10 rounded-lg m-2 my-10 animate-fade-up">
        <h1 className="mb-5 text-5xl font-bold text-base-content text-center">
          Crear sala
        </h1>
        <VenueRegisterForm />
      </div>
    </div>
  );
};

export default CreateVenue;
