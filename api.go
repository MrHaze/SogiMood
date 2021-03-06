package main

// Various values describing mood types.
const (
	Unknown string = "unknown"
	Happy   string = "happy"
	Soso    string = "so-so"
	Sad     string = "sad"
	Wtf     string = "wtf"
)

// Project is the view of a project as exposed through the API.
type Project struct {
	ID          string          `json:"id"`
	Name        string          `json:"name"`
	Description string          `json:"description"`
	Archived    bool            `json:"archived"`
	StartedAt   int64           `json:"startedAt"`   // start date
	DueAt       int64           `json:"dueAt"`       // deadline as set in the deal
	FinishedAt  int64           `json:"finishedAt"`  // real end date
	MoodsByWeek map[string]Mood `json:"moodsByWeek"` // moods by week number
}

// Mood is the view of a mood as exposed through the API.
type Mood struct {
	Customer string `json:"customer"` // is the customer happy?
	Team     string `json:"team"`     // is the team happy?
	Money    string `json:"money"`    // is the project worth it?
	Details  string `json:"details"`  // side notes
	Marker   string `json:"marker"`   // important information
}
