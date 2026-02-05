'use client';

import React, { useState } from 'react';
import styles from './SavedReadings.module.css';

interface ReadingData {
  id: number;
  image: string;
  firstName: string;
  reportName: string;
  reportDate: string;
}

const SavedReadingsPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sample data - replace with actual data
  const [data, setData] = useState<ReadingData[]>([
    // Add your data here
    // Example:
    // { id: 1, image: '/path/to/image.jpg', firstName: 'John', reportName: 'Blood Test', reportDate: '2024-02-01' }
  ]);

  // Handle select all checkbox
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(data.map(item => item.id));
      setSelectedRows(allIds);
    } else {
      setSelectedRows(new Set());
    }
  };

  // Handle individual row checkbox
  const handleRowSelect = (id: number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  // Handle delete selected rows
  const handleDelete = () => {
    if (selectedRows.size === 0) return;
    
    const confirmed = window.confirm(`Are you sure you want to delete ${selectedRows.size} item(s)?`);
    if (confirmed) {
      setData(data.filter(item => !selectedRows.has(item.id)));
      setSelectedRows(new Set());
    }
  };

  // Pagination
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>SAVED READINGS</div>
      </div>

      {/* Selected User Toggle */}
      <div className={styles.userToggle}>
        <label className={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={selectedUser}
            onChange={(e) => setSelectedUser(e.target.checked)}
            className={styles.toggleInput}
          />
          <span className={styles.toggleSlider}></span>
          <span className={styles.toggleText}>Selected User</span>
        </label>
      </div>

      {/* Delete Button */}
      <div className={styles.actionBar}>
        <button
          className={styles.deleteButton}
          onClick={handleDelete}
          disabled={selectedRows.size === 0}
        >
          DELETE
        </button>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.checkboxColumn}>
                <input
                  type="checkbox"
                  checked={selectedRows.size === data.length && data.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className={styles.checkbox}
                />
              </th>
              <th>Image</th>
              <th>First Name</th>
              <th>Report Name</th>
              <th>Report Date</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.noData}>
                  No data available
                </td>
              </tr>
            ) : (
              currentData.map((row) => (
                <tr key={row.id} className={styles.tableRow}>
                  <td className={styles.checkboxColumn}>
                    <input
                      type="checkbox"
                      checked={selectedRows.has(row.id)}
                      onChange={(e) => handleRowSelect(row.id, e.target.checked)}
                      className={styles.checkbox}
                    />
                  </td>
                  <td>
                    <img 
                      src={row.image} 
                      alt={row.firstName} 
                      className={styles.userImage}
                    />
                  </td>
                  <td>{row.firstName}</td>
                  <td>{row.reportName}</td>
                  <td>{row.reportDate}</td>
                  <td>
                    <button className={styles.optionButton}>⋮</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <div className={styles.rowsPerPage}>
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className={styles.rowsSelect}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className={styles.pageControls}>
          <span className={styles.pageInfo}>
            {startIndex + 1}-{Math.min(endIndex, data.length)} of {data.length}
          </span>
          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            ‹
          </button>
          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages || data.length === 0}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedReadingsPage;