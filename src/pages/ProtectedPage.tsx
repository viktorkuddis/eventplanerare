import { UserButton } from "@clerk/clerk-react";

const ProtectedPage = () => {
  return (
    <div>
      protectedPage
      <br />
      <br />
      <UserButton />
    </div>
  );
};

export default ProtectedPage;
