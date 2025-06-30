
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
  { id: '3', title: 'Calculus 1 - Full College Course', subject: 'Mathematics', grade: 'Secondary', duration: '11:51:33', youtubeVideoId: 'HfACr0Mpw9A', colorCodeClass: 'bg-blue-400' },
  { id: '4', title: 'Photosynthesis: Crash Course Biology #8', subject: 'Science', grade: 'Secondary', duration: '13:14', youtubeVideoId: 'uixA8ZXx0KU', colorCodeClass: 'bg-blue-400' },
  { id: '5', title: 'Why Shakespeare Loved Iambic Pentameter', subject: 'English', grade: 'Secondary', duration: '05:40', youtubeVideoId: 'rP01hYk1K1c', colorCodeClass: 'bg-blue-400' },
  { id: '6', title: 'Basic English Grammar: Parts of Speech', subject: 'English', grade: 'Primary', duration: '10:15', youtubeVideoId: 'Yd__52nUnkY', colorCodeClass: 'bg-yellow-400' },
  { id: '7', title: 'World War II: Crash Course World History #38', subject: 'History', grade: 'Secondary', duration: '13:58', youtubeVideoId: 'HlUiSBXQHCw', colorCodeClass: 'bg-blue-400' },
  { id: '8', title: 'Ancient Egypt: Crash Course World History #4', subject: 'History', grade: 'Primary', duration: '11:54', youtubeVideoId: 'Z3Wvw6YivBY', colorCodeClass: 'bg-yellow-400' },
  { id: '9', title: 'Math Antics - Basic Probability', subject: 'Mathematics', grade: 'Primary', duration: '10:00', youtubeVideoId: 'KzfWUEJjG18', colorCodeClass: 'bg-yellow-400' },
  { id: '10', title: 'Essence of calculus, chapter 1', subject: 'Mathematics', grade: 'Secondary', duration: '20:17', youtubeVideoId: 'WUvTyaaNkzM', colorCodeClass: 'bg-blue-400' },
  { id: '11', title: "What's a Food Web?", subject: 'Science', grade: 'Primary', duration: '03:22', youtubeVideoId: 'VutSmp_h6bY', colorCodeClass: 'bg-yellow-400' },
  { id: '12', title: 'The Immune System Explained I – Bacteria Infection', subject: 'Science', grade: 'Secondary', duration: '08:44', youtubeVideoId: 'zQGOcOUBi6s', colorCodeClass: 'bg-blue-400' },
  { id: '13', title: 'The Parts of a Sentence for Kids', subject: 'English', grade: 'Primary', duration: '04:15', youtubeVideoId: 'i_L5s_Rj1aQ', colorCodeClass: 'bg-yellow-400' },
  { id: '14', title: 'How to recognize a dystopia - Alex Gendler', subject: 'English', grade: 'Secondary', duration: '05:37', youtubeVideoId: 'gSjLiQxEZlM', colorCodeClass: 'bg-blue-400' },
  { id: '15', title: 'The Story of Thanksgiving', subject: 'History', grade: 'Primary', duration: '03:41', youtubeVideoId: 'Vlch_3-pg9s', colorCodeClass: 'bg-yellow-400' },
  { id: '16', title: 'The Cold War: OverSimplified (Part 1)', subject: 'History', grade: 'Secondary', duration: '15:23', youtubeVideoId: 'I79wzbU2n2g', colorCodeClass: 'bg-blue-400' },
  { id: '17', title: 'Math Antics - Long Division with 2-Digit Divisors', subject: 'Mathematics', grade: 'Primary', duration: '10:35', youtubeVideoId: 'Hl4b2-6L_wA', colorCodeClass: 'bg-yellow-400' },
  { id: '18', title: 'What is a Logarithm?', subject: 'Mathematics', grade: 'Secondary', duration: '8:01', youtubeVideoId: '0-K3c3oJ2pM', colorCodeClass: 'bg-blue-400' },
  { id: '19', title: 'What\'s a Vaccine?', subject: 'Science', grade: 'Primary', duration: '4:13', youtubeVideoId: '2s0-23g6p58', colorCodeClass: 'bg-yellow-400' },
  { id: '20', title: 'What Is Dark Matter and Dark Energy?', subject: 'Science', grade: 'Secondary', duration: '8:37', youtubeVideoId: 'QAa2O_8wBUQ', colorCodeClass: 'bg-blue-400' },
  { id: '21', title: 'Learn The 5 Vowels in English', subject: 'English', grade: 'Primary', duration: '2:29', youtubeVideoId: 'N4nI4b4-d90', colorCodeClass: 'bg-yellow-400' },
  { id: '22', title: 'The pleasure of poetic pattern - David Silverstein', subject: 'English', grade: 'Secondary', duration: '4:53', youtubeVideoId: 'URu-o_6Jv-0', colorCodeClass: 'bg-blue-400' },
  { id: '23', title: 'The Maya Civilization', subject: 'History', grade: 'Primary', duration: '3:06', youtubeVideoId: 'uMA-8I_4a5w', colorCodeClass: 'bg-yellow-400' },
  { id: '24', title: 'The French Revolution - OverSimplified (Part 1)', subject: 'History', grade: 'Secondary', duration: '29:14', youtubeVideoId: '8qRZcXIODNU', colorCodeClass: 'bg-blue-400' },
  { id: '25', title: 'Math Antics - Order Of Operations', subject: 'Mathematics', grade: 'Primary', duration: '9:40', youtubeVideoId: '_q_tS_vB_cE', colorCodeClass: 'bg-yellow-400' },
  { id: '26', title: 'Essence of linear algebra, chapter 1', subject: 'Mathematics', grade: 'Secondary', duration: '10:04', youtubeVideoId: 'fNk_zzaMoSs', colorCodeClass: 'bg-blue-400' },
  { id: '27', title: 'The Water Cycle Song', subject: 'Science', grade: 'Primary', duration: '5:27', youtubeVideoId: '9e1ccP3v2rY', colorCodeClass: 'bg-yellow-400' },
  { id: '28', title: 'The Backwards Brain Bicycle - Smarter Every Day', subject: 'Science', grade: 'Secondary', duration: '7:57', youtubeVideoId: 'MFzDaBzBlL0', colorCodeClass: 'bg-blue-400' },
  { id: '29', title: 'What Is a Noun?', subject: 'English', grade: 'Primary', duration: '7:28', youtubeVideoId: 'h0m89e9O1dM', colorCodeClass: 'bg-yellow-400' },
  { id: '30', title: 'How and Why We Read: Crash Course English Literature #1', subject: 'English', grade: 'Secondary', duration: '11:21', youtubeVideoId: 'f63W-S1Wp6I', colorCodeClass: 'bg-blue-400' },
  { id: '31', title: 'The American Revolution for Kids', subject: 'History', grade: 'Primary', duration: '10:25', youtubeVideoId: 'xg_Ag6D-YyE', colorCodeClass: 'bg-yellow-400' },
  { id: '32', title: 'The Silk Road and Ancient Trade: Crash Course History #9', subject: 'History', grade: 'Secondary', duration: '10:41', youtubeVideoId: 'vfe-eNq-Qyg', colorCodeClass: 'bg-blue-400' },
  { id: '33', title: 'Fractions Song for Kids', subject: 'Mathematics', grade: 'Primary', duration: '3:41', youtubeVideoId: 'aNdcKar_I9E', colorCodeClass: 'bg-yellow-400' },
  { id: '34', title: 'Basic Trigonometry - The Organic Chemistry Tutor', subject: 'Mathematics', grade: 'Secondary', duration: '1:02:12', youtubeVideoId: 'nQGzNf9L5Y4', colorCodeClass: 'bg-blue-400' },
  { id: '35', title: 'Volcano 101 | National Geographic', subject: 'Science', grade: 'Primary', duration: '4:51', youtubeVideoId: 'VNGUdObDoLk', colorCodeClass: 'bg-yellow-400' },
  { id: '36', title: 'How do crystals work? - Graham Baird', subject: 'Science', grade: 'Secondary', duration: '5:09', youtubeVideoId: 'pl2b2w-a_2U', colorCodeClass: 'bg-blue-400' },
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
