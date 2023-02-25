import { DropdownMenuRadio } from './Dropdown';
import { Button } from './Button';
import { Input } from './Input';
import { FormEvent } from 'react';
import { IconButton } from './IconButton';

interface Props {
  sendRequest: () => void;
  loading: boolean;
  method: { label: string; value: string };
  url: string;
  onMethodChange: (method: { label: string; value: string }) => void;
  onUrlChange: (url: string) => void;
}

export function UrlBar({ sendRequest, loading, onMethodChange, method, onUrlChange, url }: Props) {
  const handleSendRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendRequest();
  };

  return (
    <form onSubmit={handleSendRequest} className="w-full flex items-center">
      <Input
        hideLabel
        name="url"
        label="Enter URL"
        className="font-mono"
        onChange={(e) => onUrlChange(e.currentTarget.value)}
        value={url}
        placeholder="Enter a URL..."
        leftSlot={
          <DropdownMenuRadio
            onValueChange={onMethodChange}
            value={method.value}
            items={[
              { label: 'GET', value: 'GET' },
              { label: 'PUT', value: 'PUT' },
              { label: 'POST', value: 'POST' },
              { label: 'PATCH', value: 'PATCH' },
              { label: 'DELETE', value: 'DELETE' },
              { label: 'OPTIONS', value: 'OPTIONS' },
              { label: 'HEAD', value: 'HEAD' },
            ]}
          >
            <Button disabled={loading} size="sm" className="ml-1" justify="start">
              {method.label}
            </Button>
          </DropdownMenuRadio>
        }
        rightSlot={
          <IconButton
            icon={loading ? 'update' : 'paper-plane'}
            spin={loading}
            disabled={loading}
            size="sm"
            className="mr-1"
          />
        }
      />
    </form>
  );
}