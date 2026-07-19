import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, GitBranch, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEvaluations } from '../context/EvaluationContext';
import { EvaluationCard } from '../components/EvaluationCard';
import { SearchBar } from '../components/SearchBar';
import { FilterDropdown } from '../components/FilterDropdown';
import { EmptyState } from '../components/EmptyState';
import { PrimaryButton } from '../components/PrimaryButton';

export const HistoryPage: React.FC = () => {
  const { evaluations } = useEvaluations();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scoreFilter, setScoreFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const scoreOptions = [
    { value: 'all', label: 'All Scores' },
    { value: 'high', label: 'Excellent (90%+)' },
    { value: 'mid', label: 'Proficient (75%-89%)' },
    { value: 'low', label: 'Needs Focus (<75%)' }
  ];

  // Filter logic
  const filteredEvaluations = useMemo(() => {
    return evaluations.filter((item) => {
      // 1. Search Query Match
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Score Range Match
      let matchesScore = true;
      if (scoreFilter === 'high') matchesScore = item.score >= 90;
      else if (scoreFilter === 'mid') matchesScore = item.score >= 75 && item.score < 90;
      else if (scoreFilter === 'low') matchesScore = item.score < 75;

      return matchesSearch && matchesScore;
    });
  }, [evaluations, searchQuery, scoreFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredEvaluations.length / itemsPerPage);
  const paginatedEvaluations = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredEvaluations.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredEvaluations, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-6 text-left select-none">
      {/* Header title */}
      <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
        <div className="p-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-500 rounded-lg">
          <History className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider">Archives</span>
          <h2 className="text-xl font-bold tracking-tight text-zinc-100">Evaluation History</h2>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        <div className="w-full sm:flex-1">
          <SearchBar
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1); // Reset to page 1 on search
            }}
            placeholder="Search projects by title, stack, description..."
          />
        </div>
        <div className="w-full sm:w-auto shrink-0 flex items-center justify-end">
          <FilterDropdown
            options={scoreOptions}
            selectedValue={scoreFilter}
            onChange={(val) => {
              setScoreFilter(val);
              setCurrentPage(1); // Reset to page 1 on filter
            }}
            label="Rating"
          />
        </div>
      </div>

      {/* Grid Display */}
      {paginatedEvaluations.length > 0 ? (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedEvaluations.map((item) => (
              <EvaluationCard key={item.id} evaluation={item} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-zinc-900 pt-4 text-xs font-semibold text-zinc-400">
              <span className="text-zinc-550 select-none">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredEvaluations.length)} of {filteredEvaluations.length} items
              </span>
              
              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="p-1.5 border border-zinc-850 hover:border-zinc-800 hover:bg-zinc-900 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pNum = idx + 1;
                  return (
                    <button
                      key={pNum}
                      onClick={() => handlePageChange(pNum)}
                      className={`h-7 w-7 rounded-lg border flex items-center justify-center cursor-pointer transition-colors ${currentPage === pNum ? 'bg-blue-600 border-transparent text-white' : 'border-zinc-850 hover:border-zinc-800 hover:bg-zinc-900 text-zinc-300'}`}
                    >
                      {pNum}
                    </button>
                  );
                })}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="p-1.5 border border-zinc-850 hover:border-zinc-800 hover:bg-zinc-900 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          icon={GitBranch}
          title="No evaluations match your search"
          description="Try refactoring your query, selecting all ratings, or run a new evaluation."
          action={
            <PrimaryButton 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/dashboard/new')}
              leftIcon={<Plus className="h-4 w-4" />}
            >
              Start New Evaluation
            </PrimaryButton>
          }
        />
      )}
    </div>
  );
};
