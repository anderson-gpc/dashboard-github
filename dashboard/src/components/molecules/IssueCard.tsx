"use client";

import { Avatar, Button, Card, Flex, Typography } from "antd";
import { LinkOutlined } from "@ant-design/icons";

interface IssueCardProps {
  issue: any;
  onView?: (issue: any) => void;
}

export default function IssueCard({ issue, onView }: IssueCardProps) {
  return (
    <Card style={{ margin: "1rem" }}>
      <Flex vertical gap="0.75rem">
        <Typography.Title level={5} style={{ margin: 0 }}>
          {issue.title}
        </Typography.Title>

        <Typography.Text>
          <strong>Repositório:</strong>{" "}
          {issue.name ?? issue.repository_url}
        </Typography.Text>

        <Typography.Text>
          <strong>Comentários:</strong> {issue.comments}
        </Typography.Text>

        <Flex gap="0.75rem" align="center">
          <Avatar src={issue.user_avatar_url} />
          <Typography.Text>
            <strong>Autor:</strong>{" "}
            <a
              onClick={() => {
                window.open(`${issue.user_html_url}`, "_blank");
              }}
            >
              {issue.user_login}
            </a>
          </Typography.Text>
        </Flex>

        <Typography.Text>
          <strong>URL:</strong>{" "}
          <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
            {issue.html_url}
          </a>
        </Typography.Text>

        <Button
          type="primary"
          icon={<LinkOutlined />}
          onClick={() => onView?.(issue)}
        >
          Visualizar Issue
        </Button>
      </Flex>
    </Card>
  );
}

