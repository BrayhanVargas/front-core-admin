import { useCallback, useState } from "react";
import {
  createEntity,
  deleteEntity,
  editEntity,
  getAllEntities,
  getEntityById,
  EntityResponse,
} from "../services/HomeServices";

interface EmployeeData {
  id?: number;
  firstName: string;
  lastName: string;
  position?: string;
  email: string;
  phone?: string;
}

interface EntityData {
  id?: number;
  name: string;
  description: string;
  address: string;
  email: string;
  phone?: string;
  employees?: EmployeeData[];
}

export const useEntity = () => {
  const [entities, setEntities] = useState<EntityResponse[] | null>(null);
  const [entity, setEntity] = useState<EntityResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createNewEntity = async (entityData: EntityData): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const finalData = {
        ...entityData,
        employees: entityData.employees?.map((emp) => ({
          ...emp,
          id: 0,
        })),
      };
      await createEntity(finalData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateEntity = async (
    id: number,
    entityData: EntityData
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await editEntity(id, entityData);
      setEntities((prev) =>
        prev ? prev.map((ent) => (ent.id === id ? response : ent)) : [response]
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const removeEntity = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await deleteEntity(id);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchEntityById = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await getEntityById(id);
      setEntity(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchAllEntities = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllEntities();
      setEntities(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    entities,
    entity,
    createNewEntity,
    updateEntity,
    removeEntity,
    fetchEntityById,
    fetchAllEntities,
    loading,
    error,
  };
};
