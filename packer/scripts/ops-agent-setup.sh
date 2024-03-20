# install ops agent
sudo curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh

sudo bash add-google-cloud-ops-agent-repo.sh --also-install

# update config.yaml file /etc/google-cloud-ops-agent/config.yaml for ops agent to send logs to cloud logging

sudo bash -c 'cat > /etc/google-cloud-ops-agent/config.yaml' << EOF
logging:
    receivers:
        my-app-receiver:
            type: files
            include_paths:
                - "/var/log/webapp/*.log"
            record_log_file_path: true
    processors:
        my-app-processor:
            type: parse_json
            time_key: timestamp
            time_format: "%Y-%m-%d %H:%M:%S"
        winston-level-processor:
            type: modify_fields
            fields:
                severity:
                    move_from: jsonPayload.level
                    map_values:
                        "debug": "DEBUG"
                        "info": "INFO"
                        "notice": "NOTICE"
                        "warning": "WARNING"
                        "error": "ERROR"
                        "crit": "CRITICAL"
                        "alert": "ALERT"
                        "emerg": "EMERGENCY"
                
        
    service:
        pipelines:
            default_pipeline:
                receivers: [my-app-receiver]
                processors: [my-app-processor, winston-level-processor]
EOF

# restart ops agent
sudo systemctl restart google-cloud-ops-agent



