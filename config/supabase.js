import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { WebSocket } from "ws";

dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
        realtime:{
            transport: WebSocket
        }
    }
)

export default supabase;