import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import { UsersIcon, ClockIcon, MessageSquareIcon } from "lucide-react";

const FriendsPage = () => {
  const { data: friends, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
          <UsersIcon className="h-6 w-6 text-primary" />
          Friends
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : friends?.length > 0 ? (
          <div className="space-y-3">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="card-body p-4">
                  <div className="flex items-center justify-between">
                    {/* Friend Info */}
                    <div className="flex items-center gap-3">
                      <div className="avatar w-14 h-14 rounded-full bg-base-300">
                        <img src={friend.profilePic} alt={friend.fullName} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{friend.fullName}</h3>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          <span className="badge badge-secondary badge-sm">
                            Native: {friend.nativeLanguage}
                          </span>
                          <span className="badge badge-outline badge-sm">
                            Learning: {friend.learningLanguage}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Chat Button */}
                    <button className="btn btn-outline btn-sm flex items-center gap-1">
                      <MessageSquareIcon className="h-4 w-4" />
                      Chat
                    </button>
                  </div>

                  {/* Footer Info */}
                  <div className="mt-2 text-xs flex items-center gap-2 opacity-70">
                    <ClockIcon className="h-3 w-3" />
                    Friend since: {new Date(friend.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg opacity-70">You have no friends yet. 😢</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
