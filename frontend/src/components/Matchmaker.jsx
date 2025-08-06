import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthUser from "../hooks/useAuthUser"
import GroupSuggestionCard from "../components/GroupSuggestion"

const Matchmaker = () => {
  const {authUser} = useAuthUser();

  const [userId, setUserId] = useState("");
  const [matches, setMatches] = useState(null);
  const [groups,setGroups] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMatches = async () => {
    setLoading(true);
    setError("");
    try {
      //console.log(authUser)
      const userId = authUser?._id;
      setUserId(userId)
      const response = await axios.get(`http://127.0.0.1:8000/match`,{
        params:{
          userId: userId
        }
      });
      console.log(response.data)
      setMatches(response.data);

      const allGroupIds = response.data
        .flatMap((match) => match.matched_groups.map((g) => g.group_id));
      const uniqueGroupIds = [...new Set(allGroupIds)];

      // Step 3: Fetch group details
      const groupResponse = await axios.get(`http://127.0.0.1:8000/groups`, {
        params: { groupIds: uniqueGroupIds.join(",") },
      });

      // Step 4: Map group details by group_id
      //console.log(groupResponse)
      const groupMap = {};
      groupResponse.data.forEach((group) => {
        groupMap[group._id] = group;
      });
      console.log(groupMap)
      setGroups(groupMap);
      //console.log(groups)
    } catch (err) {
      console.log(err)
      setError("Failed to fetch matches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchMatches();
  },[])

  return (
    groups && <div>
    {Object?.values(groups)?.map((group) => (
      <GroupSuggestionCard key={group._id} group={group} />
    ))}
    </div>
  )
};

export default Matchmaker;



//<h1 className="text-3xl font-bold mb-4 text-center">Find Your Matches</h1>
//
//      <div className="form-control mb-4">
//        <label className="label">
//          <span className="label-text">Enter your User ID:</span>
//        </label>
//        <input
//          type="text"
//          placeholder="e.g. 689245826c01f5ac0ec7ecb5"
//          className="input input-bordered"
//          value={userId}
//          onChange={(e) => setUserId(e.target.value)}
//        />
//      </div>
//
//      <button
//        className="btn btn-primary w-full"
//        onClick={fetchMatches}
//        disabled={!userId || loading}
//      >
//        {loading ? "Loading..." : "Get Matches"}
//      </button>
//
//      {error && <p className="text-error mt-4">{error}</p>}