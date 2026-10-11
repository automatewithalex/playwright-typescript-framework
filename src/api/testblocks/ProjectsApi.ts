import { z } from 'zod';
import { ApiClient } from '../ApiClient';

const projectSchema = z.object({ id: z.union([z.string(), z.number()]), name: z.string() });

export type Project = z.infer<typeof projectSchema>;

export class ProjectsApi extends ApiClient {
  async list() {
    const response = await this.request.get('/api/projects', { headers: this.headers });
    return this.parse(response, z.object({ projects: z.array(projectSchema) }));
  }

  async create(name: string, description = 'Created by an automated test') {
    const response = await this.request.post('/api/projects', {
      headers: this.headers,
      data: { name, description },
    });
    return this.parse(response, z.object({ project: projectSchema }));
  }

  async remove(id: Project['id']) {
    const response = await this.request.delete(`/api/projects/${id}`, { headers: this.headers });
    return response.status();
  }
}
