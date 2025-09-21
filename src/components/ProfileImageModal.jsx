import { IoMdClose } from "react-icons/io";

export default function ProfileImageModal({ image, setImageModal }){
  let objectUrl;
  try {
    objectUrl = URL.createObjectURL(image);
  } catch (error) {
    console.log(error.message);
    objectUrl = null;
  }
  return (
    objectUrl && (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <button
          type="button"
          onClick={() => setImageModal(false)}
          className="absolute top-4 right-4 md:top-8 md:right-8 border-2 border-transparent hover:border-white rounded-full p-2 flex items-center justify-center transition-all duration-200"
        >
          <IoMdClose className="text-2xl md:text-4xl text-white" />
        </button>
        <img
          src={objectUrl}
          alt="profileImage"
          className="max-w-full max-h-full rounded-lg shadow-lg border border-white"
        />
      </div>
    )
  );
};