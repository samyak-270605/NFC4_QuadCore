import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import {
  LoaderIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
  CameraIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants";
import { completeOnboarding } from "../lib/api";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

 const [formState, setFormState] = useState({
  _id: authUser?.user?._id,
  bio: authUser?.bio || "",
  profilePic: authUser?.profilePic || "",
  nativeLanguage: authUser?.nativeLanguage || "",
  learningLanguage: authUser?.learningLanguage || "",
  location: authUser?.location || "",
  university: authUser?.university || "",
  major: authUser?.major || "",
  interests: Array.isArray(authUser?.interests) ? authUser.interests.join(", ") : (authUser?.interests || ""),
  studyPreferences: Array.isArray(authUser?.studyPreferences) ? authUser.studyPreferences.join(", ") : (authUser?.studyPreferences || ""),
  joinedGroups: Array.isArray(authUser?.joinedGroups) ? authUser.joinedGroups.join(", ") : (authUser?.joinedGroups || ""),
});


  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Onboarding failed");
      // console.log(authUser)
      console.log(error)
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert comma-separated strings to arrays
    const payload = {
      ...formState,
      interests: formState.interests.split(",").map((i) => i.trim()).filter(Boolean),
      studyPreferences: formState.studyPreferences.split(",").map((s) => s.trim()).filter(Boolean),
      joinedGroups: formState.joinedGroups.split(",").map((g) => g.trim()).filter(Boolean),
    };

    onboardingMutation(payload);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-2 sm:px-6 lg:px-12 py-4">
      <Toaster position="top-center" toastOptions={{ className: "text-sm px-3 py-2 max-w-xs rounded-md", duration: 3000 }} />

      <div className="card bg-base-200 w-full max-w-2xl sm:max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PROFILE PIC */}
            <div className="flex flex-col items-center space-y-4">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img src={formState.profilePic} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>
              <button type="button" onClick={handleRandomAvatar} className="btn btn-accent">
                <ShuffleIcon className="size-4 mr-2" /> Generate Random Avatar
              </button>
            </div>

            {/* BIO */}
            <div className="form-control">
              <label className="label"><span className="label-text">Bio</span></label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="textarea textarea-bordered h-24"
                placeholder="Tell others about yourself"
              />
            </div>

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Native Language</span></label>
                <select
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className="select select-bordered"
                >
                  <option value="">Select native language</option>
                  {LANGUAGES.map((lang) => <option key={`native-${lang}`} value={lang}>{lang}</option>)}
                </select>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text">Learning Language</span></label>
                <select
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className="select select-bordered"
                >
                  <option value="">Select learning language</option>
                  {LANGUAGES.map((lang) => <option key={`learning-${lang}`} value={lang}>{lang}</option>)}
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label"><span className="label-text">Location</span></label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* UNIVERSITY */}
            <div className="form-control">
              <label className="label"><span className="label-text">University</span></label>
              <input
                type="text"
                value={formState.university}
                onChange={(e) => setFormState({ ...formState, university: e.target.value })}
                className="input input-bordered"
                placeholder="Your University"
              />
            </div>

            {/* MAJOR */}
            <div className="form-control">
              <label className="label"><span className="label-text">Major</span></label>
              <input
                type="text"
                value={formState.major}
                onChange={(e) => setFormState({ ...formState, major: e.target.value })}
                className="input input-bordered"
                placeholder="Your Major/Field of Study"
              />
            </div>

            {/* INTERESTS */}
            <div className="form-control">
              <label className="label"><span className="label-text">Interests (comma separated)</span></label>
              <input
                type="text"
                value={formState.interests}
                onChange={(e) => setFormState({ ...formState, interests: e.target.value })}
                className="input input-bordered"
                placeholder="e.g. AI, Reading, Coding"
              />
            </div>

            {/* STUDY PREFERENCES */}
            <div className="form-control">
              <label className="label"><span className="label-text">Study Preferences (comma separated)</span></label>
              <input
                type="text"
                value={formState.studyPreferences}
                onChange={(e) => setFormState({ ...formState, studyPreferences: e.target.value })}
                className="input input-bordered"
                placeholder="e.g. Morning Study, Group Discussions"
              />
            </div>

            {/* JOINED GROUPS */}
            <div className="form-control">
              <label className="label"><span className="label-text">Joined Groups (comma separated)</span></label>
              <input
                type="text"
                value={formState.joinedGroups}
                onChange={(e) => setFormState({ ...formState, joinedGroups: e.target.value })}
                className="input input-bordered"
                placeholder="e.g. Math Club, Language Exchange"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button className="btn btn-primary w-full" disabled={isPending} type="submit">
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" /> Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" /> Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
