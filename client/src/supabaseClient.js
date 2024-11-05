// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gjvlfbmfhlpuygquqthh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqdmxmYm1maGxwdXlncXVxdGhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MTMzNTcsImV4cCI6MjA0NjI4OTM1N30.2zX7VFtHQ_ITGqxTtG1fsGRrYds8RProomBoFE3-vMI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;