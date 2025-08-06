import React from "react";

const GroupSuggestionCard = ({ group, onJoin }) => {
  return (
    <div className="card w-full max-w-md bg-base-100 border border-base-300 shadow-md hover:shadow-lg transition duration-300">
      <div className="card-body p-5 space-y-4">
        {/* Header with title and join button - flex layout */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1 flex-1 min-w-0">
            <h2 className="text-lg font-bold text-base-content truncate">
              {group.groupName}
            </h2>
            <p className="text-sm text-base-content opacity-70">
              Field: {group.field}
            </p>
          </div>
          <button
            onClick={() => onJoin(group._id)}
            className="btn btn-primary btn-sm"
          >
            Join
          </button>
        </div>

        {/* Description */}
        <p className="text-base-content opacity-90 text-sm line-clamp-3">
          {group.description || "No description provided."}
        </p>

        {/* Badges - DaisyUI compatible */}
        <div className="flex flex-wrap gap-2 text-sm">
          <div className="badge badge-outline px-3 py-1">
            Max: {group.maxMembers}
          </div>
          <div className="badge badge-secondary px-3 py-1">
            Members: {group.members?.length || 0}
          </div>
          <div className={`badge px-3 py-1 ${
            group.universitySpecific 
              ? "badge-success" 
              : "badge-accent"
          }`}>
            {group.universitySpecific ? "University Specific" : "Open to All"}
          </div>
        </div>

        {/* Meeting Link */}
        {group.meetingLink && (
          <a
            href={group.meetingLink}
            className="btn btn-sm btn-outline btn-primary w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 Join Meeting
          </a>
        )}

        {/* Footer */}
        <p className="text-xs text-base-content opacity-60 mt-2">
          Last updated: {new Date(group.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default GroupSuggestionCard;