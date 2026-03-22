/** Core database types for the Hassan SADS App */

export type RiskLevel = 'low' | 'moderate' | 'high';
export type AgeBand = '12-17' | '18-25' | '26-35' | '36+';
export type ConsentEventType = 'consent_given' | 'opt_out' | 'withdraw' | 'data_exported';

export interface Participant {
  id: string;
  email: string;
  full_name: string;
  date_of_birth: string; // ISO 8601
  age_band: AgeBand;
  consent_given_at: string | null;
  opted_out_at: string | null;
  withdrawn_at: string | null;
  parent_consent_required: boolean;
  parent_consent_given_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface QuestionnaireSubmission {
  id: string;
  participant_id: string;
  submitted_at: string;
  risk_level: RiskLevel;
  flagged_question_ids: string[];
  referral_triggered: boolean;
  pdf_url: string | null;
  created_at: string;
}

export interface QuestionResponse {
  id: string;
  submission_id: string;
  question_id: string;
  answer_value: string;
  is_flag: boolean;
  created_at: string;
}

export interface GpReferral {
  id: string;
  submission_id: string;
  gp_email: string;
  sent_at: string | null;
  acknowledged_at: string | null;
  created_at: string;
}

export interface ConsentEvent {
  id: string;
  participant_id: string;
  event_type: ConsentEventType;
  timestamp: string;
  ip_hash: string | null;
  metadata: Record<string, unknown> | null;
}

export interface ResearchCohortRow {
  id: string;
  age_band: AgeBand;
  sex: string;
  county: string | null;
  risk_level: RiskLevel;
  flagged_question_ids: string[];
  moderate_concern_ids: string[];
  submitted_month: string; // YYYY-MM
  exercise_hours_band: string | null;
  created_at: string;
}

/** Database schema type — mirrors Supabase generated types */
export interface Database {
  public: {
    Tables: {
      participants: {
        Row: Participant;
        Insert: Omit<Participant, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Participant, 'id' | 'created_at'>>;
        Relationships: [];
      };
      questionnaire_submissions: {
        Row: QuestionnaireSubmission;
        Insert: Omit<QuestionnaireSubmission, 'id' | 'created_at'>;
        Update: Partial<Omit<QuestionnaireSubmission, 'id' | 'created_at'>>;
        Relationships: [];
      };
      question_responses: {
        Row: QuestionResponse;
        Insert: Omit<QuestionResponse, 'id' | 'created_at'>;
        Update: never;
        Relationships: [];
      };
      gp_referrals: {
        Row: GpReferral;
        Insert: Omit<GpReferral, 'id' | 'created_at'>;
        Update: Pick<GpReferral, 'acknowledged_at'>;
        Relationships: [];
      };
      consent_events: {
        Row: ConsentEvent;
        Insert: Omit<ConsentEvent, 'id'>;
        Update: never;
        Relationships: [];
      };
      research_cohort: {
        Row: ResearchCohortRow;
        Insert: Omit<ResearchCohortRow, 'id' | 'created_at'>;
        Update: never;
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
  };
}
