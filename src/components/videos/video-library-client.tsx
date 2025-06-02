"use client";

import { useState } from 'react';
import { PageWrapper } from '@/components/ui/page-wrapper';
import VideoCard from './video-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const videos = [
  { id: '1', title: 'Introduction to Algebra', subject: 'Mathematics', grade: 'Primary', duration: '12:34', thumbnailUrl: 'https://placehold.co/400x225.png', thumbnailHint: "math classroom", colorCodeClass: 'bg-yellow-400' },
  { id: '2', title: 'The Solar System', subject: 'Science', grade: 'Primary', duration: '15:02', thumbnailUrl: 'https://placehold.co/400x225.png', thumbnailHint: "solar system", colorCodeClass: 'bg-yellow-400' },
  { id: '3', title: 'Advanced Calculus Concepts', subject: 'Mathematics', grade: 'Secondary', duration: '25:10', thumbnailUrl: 'https://placehold.co/400x225.png', thumbnailHint: "calculus equations", colorCodeClass: 'bg-blue-400' },
  { id: '4', title: 'Photosynthesis Explained', subject: 'Science', grade: 'Secondary', duration: '18:55', thumbnailUrl: 'https://placehold.co/400x225.png', thumbnailHint: "plant leaves", colorCodeClass: 'bg-blue-400' },
  { id: '5', title: 'Shakespearean Sonnets', subject: 'English', grade: 'Secondary', duration: '22:00', thumbnailUrl: 'https://placehold.co/400x225.png', thumbnailHint: "old book", colorCodeClass: 'bg-blue-400' },
  { id: '6', title: 'Basic Grammar Rules', subject: 'English', grade: 'Primary', duration: '10:15', thumbnailUrl: 'https://placehold.co/400x225.png', thumbnailHint: "notebook pen", colorCodeClass: 'bg-yellow-400' },
  { id: '7', title: 'World War II Overview', subject: 'History', grade: 'Secondary', duration: '30:00', thumbnailUrl: 'https://placehold.co/400x225.png', thumbnailHint: "historic map", colorCodeClass: 'bg-blue-400' },
  { id: '8', title: 'Ancient Civilizations', subject: 'History', grade: 'Primary', duration: '14:30', thumbnailUrl: 'https://placehold.co/400x225.png', thumbnailHint: "pyramids desert", colorCodeClass: 'bg-yellow-400' },
];

const grades = ['All', 'Primary', 'Secondary'];
const subjects = ['All', 'Mathematics', 'Science', 'English', 'History'];

export default function VideoLibraryClient() {
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVideos = videos.filter(video => 
    (selectedGrade === 'All' || video.grade === selectedGrade) &&
    (selectedSubject === 'All' || video.subject === selectedSubject) &&
    (video.title.toLowerCase().includes(searchTerm.toLowerCase()) || video.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <PageWrapper>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold mb-2">Video Library</h1>
        <p className="text-lg text-muted-foreground">Explore our collection of educational videos.</p>
      </div>

      <div className="mb-8 p-6 bg-card border rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="relative">
            <label htmlFor="search" className="block text-sm font-medium text-foreground mb-1">Search Videos</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground h-5 w-5 mt-3" />
            <Input
              id="search"
              type="text"
              placeholder="Search by title or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div>
            <label htmlFor="grade-filter" className="block text-sm font-medium text-foreground mb-1">Filter by Grade</label>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger id="grade-filter">
                <SelectValue placeholder="Filter by Grade" />
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
                <SelectValue placeholder="Filter by Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(subject => <SelectItem key={subject} value={subject}>{subject}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVideos.map(video => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No videos found matching your criteria.</p>
        </div>
      )}
    </PageWrapper>
  );
}
