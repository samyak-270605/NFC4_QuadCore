import { useQuery } from "@tanstack/react-query";
import { UserIcon, CalendarIcon } from "lucide-react";
import { getLeaderboard } from "../lib/api";

const Leaderboard = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getLeaderboard,
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Leaderboard
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : users && users.length > 0 ? (
          <div className="space-y-4">
            {users.map((user, index) => (
              <div
                key={user._id}
                className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="card-body p-4 flex items-center justify-between">
                  {/* LEFT: Rank + Avatar + Info */}
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-semibold w-6 text-center">
                      {index + 1}
                    </span>
                    <div className="avatar w-14 h-14 rounded-full bg-base-300">
                      {user.profilePic ? (
                        <img
                          src={user.profilePic}
                          alt={user.fullName}
                          className="rounded-full"
                        />
                      ) : (
                        <UserIcon className="w-8 h-8 text-base-content opacity-50 m-auto" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.fullName}</h3>
                      <div className="flex flex-wrap gap-2 mt-1 text-sm opacity-80">
                        <span>Native: {user.nativeLanguage || "N/A"}</span>
                        <span>| Learning: {user.learningLanguage || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Registration Date */}
                  <div className="flex items-center gap-2 text-sm opacity-70">
                    <CalendarIcon className="w-4 h-4" />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-base-content opacity-70">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
