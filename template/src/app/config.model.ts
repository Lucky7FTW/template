export interface Config {
    sidebar?: {
      enabled?: boolean;
      position?: string;
    };
    navbar?: {
      enabled?: boolean;
      dropdownTrigger?: string; 
    };
    footer?: {
      enabled?: boolean;
      position?: string; 
    };
    header?: {
      enabled?: boolean;
      title?: string;   
      position?: string;
    };
    languagePicker?: {
      enabled?: boolean;
      languages?: {
        name: string; 
        enabled: boolean; 
      }[];
    };
  }
  