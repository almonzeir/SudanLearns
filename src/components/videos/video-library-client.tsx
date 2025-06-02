
"use client";

import { useState } from 'react';
import { PageWrapper } from '@/components/ui/page-wrapper';
import VideoCard from './video-card';
import VideoPlayerModal from './video-player-modal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter } from 'lucide-react';

const videos = [
  { id: '1', title: 'Introduction to Algebra', subject: 'Mathematics', grade: 'Primary', duration: '12:34', youtubeVideoId: 'NybHckSEQBI', colorCodeClass: 'bg-yellow-400' },
  { id: '2', title: 'The Solar System - Fun Facts for Kids', subject: 'Science', grade: 'Primary', duration: '15:02', youtubeVideoId: 'libKVRa01L8', colorCodeClass: 'bg-yellow-400' },
  { id: '3', title: 'Calculus 1 - Full College Course', subject: 'Mathematics', grade: 'Secondary', duration: '25:10', youtubeVideoId: 'WUvTyaaNkzM', colorCodeClass: 'bg-blue-400' },
  { id: '4', title: 'Photosynthesis: Crash Course Biology #8', subject: 'Science', grade: 'Secondary', duration: '18:55', youtubeVideoId: 'uixA8ZXx0KU', colorCodeClass: 'bg-blue-400' },
  { id: '5', title: 'Why Shakespeare Loved Iambic Pentameter', subject: 'English', grade: 'Secondary', duration: '22:00', youtubeVideoId: 'rP01hYk1K1c', colorCodeClass: 'bg-blue-400' },
  { id: '6', title: 'Basic English Grammar: Parts of Speech', subject: 'English', grade: 'Primary', duration: '10:15', youtubeVideoId: 'Yd__52nUnkY', colorCodeClass: 'bg-yellow-400' },
  { id: '7', title: 'World War II: Crash Course World History #38', subject: 'History', grade: 'Secondary', duration: '30:00', youtubeVideoId: 'HlUiSBXQHCw', colorCodeClass: 'bg-blue-400' },
  { id: '8', title: 'Ancient Egypt: Crash Course World History #4', subject: 'History', grade: 'Primary', duration: '14:30', youtubeVideoId: 'Z3Wvw6YivBY', colorCodeClass: 'bg-yellow-400' },
];

const grades = ['All', 'Primary', 'Secondary'];
const subjects = ['All', 'Mathematics', 'Science', 'English', 'History'];

export default function VideoLibraryClient() {
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentVideo, setCurrentVideo] = useState<{ id: string; title: string } | null>(null);

  const filteredVideos = videos.filter(video => 
    (selectedGrade === 'All' || video.grade === selectedGrade) &&
    (selectedSubject === 'All' || video.subject === selectedSubject) &&
    (video.title.toLowerCase().includes(searchTerm.toLowerCase()) || video.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handlePlayVideo = (videoId: string, videoTitle: string) => {
    setCurrentVideo({ id: videoId, title: videoTitle });
  };

  const handleCloseModal = () => {
    setCurrentVideo(null);
  };

  return (
    <PageWrapper>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold mb-2">Video Library</h1>
        <p className="text-lg text-muted-foreground">Explore our collection of educational videos.</p>
      </div>

      <Card className="mb-10 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-headline">
            <Filter className="mr-2 h-5 w-5 text-primary" />
            Filter & Search Videos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="relative">
              <label htmlFor="search" className="block text-sm font-medium text-foreground mb-1">Search by Title/Subject</label>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground h-5 w-5 mt-3" />
              <Input
                id="search"
                type="text"
                placeholder="e.g., Algebra, Solar System..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div>
              <label htmlFor="grade-filter" className="block text-sm font-medium text-foreground mb-1">Filter by Grade</label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger id="grade-filter">
                  <SelectValue placeholder="Select Grade Level" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map(grade => <SelectItem key={grade} value={grade}>{grade}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="subject-filter" className="block text-sm font-medium text-foreground mb-1">Filter by Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger id="subject-filter">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => <SelectItem key={subject} value={subject}>{subject}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVideos.map(video => (
            <VideoCard 
              key={video.id} 
              {...video} 
              onPlay={handlePlayVideo}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No videos found matching your criteria. Try adjusting your filters!</p>
        </div>
      )}

      {currentVideo && (
        <VideoPlayerModal
          youtubeVideoId={currentVideo.id}
          title={currentVideo.title}
          isOpen={!!currentVideo}
          onClose={handleCloseModal}
        />
      )}
    </PageWrapper>
  );
}
