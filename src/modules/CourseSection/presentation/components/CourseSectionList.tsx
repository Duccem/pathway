import { Badge } from '@/lib/ui/badge';
import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd';
import { CourseSection } from "@prisma/client";
import { Grip, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface CourseSectionListProps {
  items: CourseSection[];
  onReorder: (updateData: { id: string, position: number }[]) => void;
  onEdit: (id: string) => void;
}
const CourseSectionList = ({ items, onReorder, onEdit }: CourseSectionListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [sections, setSections] = useState<CourseSection[]>(items);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    setSections(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedSections = items.slice(startIndex, endIndex + 1);
    setSections(items);

    const updateData = updatedSections.map((section, index) => ({
      id: section.id,
      position: items.findIndex((item) => item.id === section.id),
    }));

    onReorder(updateData);
  };

  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <div className={`${sections.length > 0 ? 'my-10' : 'mt-7'} flex flex-col gap-5 max-h-[300px] overflow-y-scroll no-scrollbar`} {...provided.droppableProps} ref={provided.innerRef}>
            {
              sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <div className="flex items-center bg-ducen-secondary rounded-lg text-sm font-medium p-3" {...provided.draggableProps} ref={provided.innerRef}>
                      <div {...provided.dragHandleProps}>
                        <Grip className="h-4 w-4 cursor-pointer mr-4 "/>
                      </div>
                      {section.title}
                      <div className="ml-auto flex justify-end items-center gap-x-3">
                        { section.isFree ? <Badge className='bg-[#22a094]'>Free</Badge> : null }
                        { section.isPublished ? <Badge className='bg-[#22a094]'>Published</Badge> : <Badge>Draft</Badge>}
                        <Pencil className="h-4 w-4 cursor-pointer "
                          onClick={() => onEdit(section.id)}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>

  );
}

export default CourseSectionList;
