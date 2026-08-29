import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  ThumbsUp,
  PlusCircle,
  Hash,
  Sparkles,
  HelpCircle,
  BarChart2,
  CheckCircle2,
  Share2,
  Send,
  X,
  Flame,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CommunityPost } from '../types';

export const CommunitiesPage: React.FC = () => {
  const {
    communities,
    communityPosts,
    joinedCommunities,
    joinCommunity,
    leaveCommunity,
    createCommunityPost,
    upvotePost,
    voteOnPoll,
    currentUser,
    globalSearchQuery,
    selectedItemId,
    setSelectedItemId
  } = useApp();

  const [selectedCommunityId, setSelectedCommunityId] = useState<string>(selectedItemId || 'all');
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  // Sync selected community if coming from global search
  React.useEffect(() => {
    if (selectedItemId && communities.some((c) => c.id === selectedItemId)) {
      setSelectedCommunityId(selectedItemId);
    }
  }, [selectedItemId, communities]);

  // Post form state
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postType, setPostType] = useState<'Discussion' | 'Question' | 'Resource' | 'Poll'>('Discussion');
  const [targetCommunityId, setTargetCommunityId] = useState(communities[0]?.id || 'comm_web');
  const [pollOptionsText, setPollOptionsText] = useState('Option A, Option B, Option C');

  const effectiveSearch = (localSearch || globalSearchQuery || '').trim().toLowerCase();

  const filteredPosts = communityPosts.filter((post) => {
    const matchesCommunity =
      selectedCommunityId === 'all' || post.communityId === selectedCommunityId;
    
    if (!effectiveSearch) return matchesCommunity;

    const authorName = post.author?.name || (post as any).authorName || '';
    const authorCollege = post.author?.college || (post as any).authorCollege || '';
    const title = post.title || '';
    const content = post.content || '';
    const tags = post.tags || [];

    const matchesSearch =
      title.toLowerCase().includes(effectiveSearch) ||
      content.toLowerCase().includes(effectiveSearch) ||
      authorName.toLowerCase().includes(effectiveSearch) ||
      authorCollege.toLowerCase().includes(effectiveSearch) ||
      tags.some((t) => t.toLowerCase().includes(effectiveSearch));

    return matchesCommunity && matchesSearch;
  });

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postContent) return;

    let pollOptions = undefined;
    if (postType === 'Poll') {
      const opts = pollOptionsText.split(',').map((o) => o.trim()).filter(Boolean);
      pollOptions = opts.map((text, idx) => ({
        id: `opt-${idx + 1}`,
        text,
        votes: 0
      }));
    }

    createCommunityPost(targetCommunityId, postTitle, postContent, postType, pollOptions);
    setPostModalOpen(false);
    setPostTitle('');
    setPostContent('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-500/30 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full border border-indigo-400/30 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-300" />
              10+ Student Tech Domain Hubs
            </span>
            <span className="text-xs text-indigo-200">Peer Collaboration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Campus Field Communities
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-xl">
            Collaborate, ask debugging questions, participate in student polls, and share resources with fellow engineers & designers.
          </p>
        </div>

        <button
          onClick={() => setPostModalOpen(true)}
          className="px-5 py-3 bg-white hover:bg-indigo-50 text-indigo-900 font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-indigo-600" />
          <span>Create Post or Poll</span>
        </button>
      </div>

      {/* Communities Carousel / Pills */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-sm text-slate-800">
            Browse Tech Domains ({communities.length})
          </h3>
          <span className="text-xs text-indigo-600 font-semibold">
            You're in {joinedCommunities.length} communities
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <button
            onClick={() => setSelectedCommunityId('all')}
            className={`p-3 rounded-2xl border text-left transition ${
              selectedCommunityId === 'all'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-lg">🌐</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                selectedCommunityId === 'all' ? 'bg-white/20' : 'bg-slate-100'
              }`}>
                All
              </span>
            </div>
            <p className="font-bold text-xs truncate">Campus Feed</p>
            <p className={`text-[10px] truncate ${selectedCommunityId === 'all' ? 'text-indigo-100' : 'text-slate-400'}`}>
              All Domains
            </p>
          </button>

          {communities.map((comm) => {
            const isJoined = joinedCommunities.includes(comm.id);
            const isSelected = selectedCommunityId === comm.id;
            return (
              <div
                key={comm.id}
                onClick={() => setSelectedCommunityId(comm.id)}
                className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg">{comm.icon}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        isJoined ? leaveCommunity(comm.id) : joinCommunity(comm.id);
                      }}
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded transition ${
                        isSelected
                          ? isJoined ? 'bg-white/30 text-white' : 'bg-white text-indigo-900'
                          : isJoined ? 'bg-emerald-50 text-emerald-800' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                      }`}
                    >
                      {isJoined ? '✓ Joined' : '+ Join'}
                    </button>
                  </div>
                  <p className="font-bold text-xs truncate">{comm.name}</p>
                </div>
                <p className={`text-[10px] truncate mt-1 ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                  {comm.membersCount} members
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Posts Stream */}
      <div className="space-y-4">
        {/* Search & Filter */}
        <div className="bg-white p-3.5 rounded-2xl border border-indigo-100 shadow-xs flex items-center gap-3">
          <Search className="w-4 h-4 text-indigo-500" />
          <input
            type="text"
            placeholder="Search discussions, questions, answers, and polls across communities..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="flex-1 bg-transparent text-xs outline-none text-slate-800 placeholder:text-slate-400"
          />
          {localSearch && (
            <button
              onClick={() => setLocalSearch('')}
              className="text-xs text-slate-400 hover:text-slate-600 font-medium"
            >
              Clear
            </button>
          )}
        </div>

        {/* Post Cards */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-dashed border-indigo-200 text-center space-y-2">
              <p className="font-bold text-slate-800 text-sm">No community posts match your search.</p>
              <p className="text-xs text-slate-500">Try searching for keywords like "React", "Embedded", "Design", or start a new thread!</p>
              <button
                onClick={() => setPostModalOpen(true)}
                className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700"
              >
                + Start Discussion
              </button>
            </div>
          ) : (
            filteredPosts.map((post) => {
              const authorAvatar = post.author?.avatar || (post as any).authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';
              const authorName = post.author?.name || (post as any).authorName || 'Campus Peer';
              const authorCollege = post.author?.college || (post as any).authorCollege || 'Verified College';
              const isVerified = post.author?.isVerified ?? true;
              const communityName = communities.find((c) => c.id === post.communityId)?.name || (post as any).communityName || 'Campus Tech';
              const isLiked = post.isLikedByMe ?? (post as any).isUpvoted ?? false;
              const likesCount = post.likesCount ?? (post as any).upvotes ?? 1;

              return (
                <div
                  key={post.id}
                  className="bg-white p-6 rounded-3xl border border-indigo-100 shadow-sm hover:shadow-md transition space-y-4"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={authorAvatar}
                        alt={authorName}
                        className="w-10 h-10 rounded-full object-cover border border-indigo-200"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-slate-900">{authorName}</span>
                          {isVerified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          )}
                          <span className="text-[10px] text-slate-400">• {authorCollege}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.2 rounded-full border border-indigo-100">
                            #{communityName}
                          </span>
                          <span className="text-[10px] text-slate-400">{post.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        post.type?.toLowerCase() === 'poll'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : post.type?.toLowerCase() === 'question'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                      }`}
                    >
                      {post.type}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-base text-slate-900">
                      {post.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>
                  </div>

                  {/* Poll Options (if poll type) */}
                  {post.type?.toLowerCase() === 'poll' && post.pollOptions && (
                    <div className="p-4 bg-indigo-50/40 rounded-2xl border border-indigo-100 space-y-2.5">
                      <p className="text-[11px] font-bold text-indigo-900 flex items-center gap-1.5">
                        <BarChart2 className="w-4 h-4 text-indigo-600" />
                        <span>Campus Student Poll (Click an option to vote)</span>
                      </p>
                      <div className="space-y-2">
                        {post.pollOptions.map((opt) => {
                          const totalVotes = post.pollOptions!.reduce((acc, o) => acc + o.votes, 0) || 1;
                          const pct = Math.round((opt.votes / totalVotes) * 100);
                          const isVoted = opt.userVoted || (post as any).userVotedOptionId === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => voteOnPoll(post.id, opt.id)}
                              className={`w-full p-2.5 rounded-xl border text-left text-xs transition relative overflow-hidden flex items-center justify-between ${
                                isVoted
                                  ? 'border-indigo-500 bg-indigo-50 font-bold text-indigo-950 shadow-xs'
                                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <div
                                className={`absolute left-0 top-0 bottom-0 ${
                                  isVoted ? 'bg-indigo-200/50' : 'bg-slate-200/50'
                                }`}
                                style={{ width: `${pct}%` }}
                              ></div>
                              <span className="relative z-10 flex items-center gap-2">
                                {isVoted && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                                {opt.text}
                              </span>
                              <span className="relative z-10 font-bold text-[11px] text-slate-500">
                                {pct}% ({opt.votes})
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Actions Footer */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => upvotePost(post.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
                          isLiked
                            ? 'bg-indigo-50 text-indigo-600 font-bold border border-indigo-200'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-indigo-600 text-indigo-600' : ''}`} />
                        <span>{likesCount} Upvotes</span>
                      </button>

                      <button className="flex items-center gap-1.5 text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-xl">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{post.commentsCount || 0} Comments</span>
                      </button>
                    </div>

                    <span className="text-[11px] text-slate-400">
                      Campus Verified Student Thread
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      {postModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-base text-slate-900">
                Create Community Post or Poll
              </h3>
              <button onClick={() => setPostModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Community</label>
                  <select
                    value={targetCommunityId}
                    onChange={(e) => setTargetCommunityId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    {communities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.icon} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Post Type</label>
                  <select
                    value={postType}
                    onChange={(e) => setPostType(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    <option value="Discussion">Discussion</option>
                    <option value="Question">Question</option>
                    <option value="Resource">Resource Share</option>
                    <option value="Poll">Live Poll</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Title / Headline</label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Best resources to master STM32 Bare Metal in 2026?"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Content / Context</label>
                <textarea
                  rows={4}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share details, context, code snippet links, or question background..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              {postType === 'Poll' && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Poll Options (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={pollOptionsText}
                    onChange={(e) => setPollOptionsText(e.target.value)}
                    placeholder="KiCad, Altium Designer, Eagle"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPostModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold"
                >
                  Publish to Community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
